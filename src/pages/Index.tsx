
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadPage from '../components/UploadPage';
import DownloadPage from '../components/DownloadPage';
import { Upload, Download, Share2 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Share2 className="h-12 w-12 text-white mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              FileShare
            </h1>
          </div>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Send files instantly between devices over the internet. No registration, no limits, completely free.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <Upload className="h-16 w-16 text-white mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Send Files</h2>
                <p className="text-white/80">Upload your file and get a share code</p>
              </div>
              <UploadPage />
            </div>

            {/* Download Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <Download className="h-16 w-16 text-white mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Receive Files</h2>
                <p className="text-white/80">Enter a share code to download</p>
              </div>
              <DownloadPage />
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-white/70 text-sm">
            Files are automatically deleted after 24 hours • Maximum file size: 100MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
