import React, { useState,useEffect } from 'react';
import { saveAs } from 'file-saver';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaCopy, FaFilePdf, FaFileAlt } from 'react-icons/fa';
import html2pdf from 'html3pdf';
import MagicButton from '../components/MagicButton.js';
import { AnimatedBackground } from 'animated-backgrounds';
import { generateEssay } from '../ai/AI.js';

const EssayGenerator = () => {
  const [topic, setTopic] = useState('');
  const [wordCount, setWordCount] = useState(300);
  const [style, setStyle] = useState('Formal');
  const [includeText, setIncludeText] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);



  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const generateEssayHandler = async () => {
    if (!topic) {
      alert("Please enter the essay topic.");
      return;
    }

    setIsGenerating(true);

    const requestBody = {
      prompt: `Write an essay about "${topic}" in ${wordCount} words. The writing style should be ${style}. ${
        includeText ? `Include the following information: ${includeText}.` : ''
      }`,
    };

    try {
      const essay = await generateEssay(requestBody); //  reusable function for future dev
      setEditorContent(essay);
    } catch (error) {
      console.error('Error generating essay:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPdf = () => {
    const editor = document.querySelector('.ql-editor');
    
    const headings = editor.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
      switch (heading.tagName) {
        case 'H1':
          heading.style.fontSize = '24px';
          heading.style.fontWeight = 'bold';
          break;
        case 'H2':
          heading.style.fontSize = '20px';
          heading.style.fontWeight = 'bold';
          break;
        case 'H3':
          heading.style.fontSize = '18px';
          heading.style.fontWeight = 'bold';
          break;
        default:
          heading.style.fontSize = '16px';
          heading.style.fontWeight = 'bold';
          break;
      }
    });
  
    const paragraphs = editor.querySelectorAll('p, span');
    paragraphs.forEach((p) => {
      p.style.fontSize = '12px'; 
      p.style.lineHeight = '1.5';
    });
  
    editor.style.padding = '10px';
    editor.style.margin = '10px';
  
    const options = {
      margin: 0.5, 
      filename: `${topic}_essay.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
  
    html2pdf().from(editor).set(options).save();
  };

  const handleDownloadText = () => {

    const filteredContent = editorContent.replace(/<\/?[^>]+(>|$)/g, '').replace(/[\x7F]/g, '');
  
    const blob = new Blob([filteredContent], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${topic}_essay.txt`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateEssayHandler();
  };

  const handleCopyText = () => {
    const filteredContent = editorContent.replace(/<\/?[^>]+(>|$)/g, '').replace(/[\x7F]/g, '');
    navigator.clipboard.writeText(filteredContent);
    alert("Copied to clipboard!");
  };

  return (
    <div className="bg-none min-h-screen flex flex-col items-center p-4 font-popins justify-center -mt-1">
      <AnimatedBackground animationName="geometricShapes" style={{ opacity: 0.3 }} />
      <div className="flex flex-col md:flex-row w-full max-w-7xl space-y-6 md:space-y-0 md:space-x-8">
        {/* Input Section */}
        <form onSubmit={handleSubmit} className="relative bg-white p-5 pt-8 rounded-lg shadow-md w-full md:w-1/3">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Topic</h2>
          <h2 className="block text-gray-700 font-medium mb-1 text-left">Enter your Topic</h2>
          <p className="text-gray-500 text-xs mb-3 text-left">Enter the main subject</p>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ex : Benefits of electric vehicle"
            maxLength="60"
            className="w-full p-3 h-24 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />

          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-1 text-left">Writing Style</label>
            <p className="text-gray-500 text-xs mb-2 text-left">Choose a style that best suits your essay purpose.</p>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="Formal">Formal</option>
              <option value="Informal">Informal</option>
              <option value="Simple English">Simple English</option>
              <option value="Description for a post">Description for a post</option>
              <option value="Story">Story</option>
              <option value="Persuasive">Persuasive</option>
              <option value="Descriptive">Descriptive</option>
              <option value="Narrative">Narrative</option>
              <option value="Analytical">Analytical</option>
              <option value="Argumentative">Argumentative</option>
              <option value="Creative">Creative</option>
            </select>
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-1 text-left">Include Text</label>
            <p className="text-gray-500 text-xs mb-2 text-left">Add any specific details or points to include in the essay.</p>
            <textarea
              value={includeText}
              onChange={(e) => setIncludeText(e.target.value)}
              placeholder="Additional information to include in the essay"
              className="w-full p-3 h-20 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-1 text-left">Word Count</label>
            <p className="text-gray-500 text-xs mb-2 text-left">Specify the desired length of the essay (50-500 words).</p>
            <input
              type="range"
              min="50"
              max="500"
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
              className="w-full"
            />
            <p className="text-gray-600 text-sm text-center mt-1">{wordCount} words</p>
          </div>

          <div className='mt-10 flex justify-center'>
            <MagicButton
              className="text-white px-4 py-2 rounded-md transition"
              onClick={handleSubmit}
              isGenerating={isGenerating}
              label={isGenerating ? "Generating..." : "Generate"}
            />
          </div>
        </form>


        {/* Output Section */}
        <div className="bg-white p-3 md:p-6 rounded-lg shadow-md w-full md:w-2/3 flex flex-col">
        <div className="relative flex justify-center items-center mb-4">
  <h2 className="text-xl font-semibold text-gray-700">AI Output</h2>
  <button 
    onClick={handleCopyText} 
    className={`${
      isGenerating ? 'bg-gray-200' : 'bg-gray-200'
    } text-gray-600 hover:text-gray-600 px-4 py-2 rounded-md w-13 absolute top-0 right-0`}
    disabled={isGenerating}
  >
    <FaCopy />
  </button>

</div>
          <div className="relative border border-gray-300 rounded-md p-4 h-[40rem] overflow-y-auto bg-gray-50 text-gray-700 whitespace-pre-wrap">
            <ReactQuill 
              value={editorContent}
              onChange={setEditorContent}
              placeholder="Your generated essay will appear here..."
              theme="snow"
              className="h-[34rem] w-full text-lg" 
            />
          </div>

          <div className="flex items-center justify-between mt-4 space-x-2">
  <button
    className={`${
      !editorContent ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
    } text-white px-4 py-2 rounded-md transition flex items-center`}
    onClick={handleDownloadPdf}
    disabled={!editorContent}
  >
    <FaFilePdf className="mr-2" />
    <span className="block md:hidden">Download PDF</span> 
    <span className="hidden md:block">Download as PDF</span> 
  </button>

  <button
    className={`${
      !editorContent ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
    } text-white px-4 py-2 rounded-md transition flex items-center`}
    onClick={handleDownloadText}
    disabled={!editorContent}
  >
    <FaFileAlt className="mr-2" />
    <span className="block md:hidden">Download Text</span> 
    <span className="hidden md:block">Download as Text</span>
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default EssayGenerator;