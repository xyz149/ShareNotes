import { useEffect, useState } from "react";
import axios from "axios";

interface FileData {
  title: string;
  pdf: string;
}

const UploadNotes = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [allFiles, setAllFiles] = useState<FileData[]>([]);

  const submitPDF = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);
    try {
      const result = await axios.post("https://sharenotesbackend.onrender.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(result);
      if (result.data.status === "Ok") {
        alert("Uploaded Successfully");
        setTitle('');
        setFile(null);
        getPDF();
      }
      else {
        alert('Upload failed: ' + result.data.message);
      } 
    }
    catch (error) {
      console.error("Error uploading file :", error);
    }
  };

  useEffect(() => {
    getPDF();
  }, []);

  const getPDF = async () => {
    try {
      const result = await axios.get("https://sharenotesbackend.onrender.com/get-files");
      if (result.data.status === "OK") {
        setAllFiles(result.data.data);  // This will now work correctly
      } else {
        console.error('Failed to fetch files:', result.data.message);
        alert('Failed to load files. Please try again.');
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      alert('Error fetching files. Please check your network connection.');
    }
  };


  const showPDF = (pdf: string) => {
    const pdfUrl = `https://sharenotesbackend.onrender.com/files/${pdf}`;
    window.open(pdfUrl, "_blank");
  };


  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">Student Dashboard</h2>
      <div className="row g-4">
        <div className="col-md-8">
          <div className="p-4 bg-white shadow rounded">
            <h4 className=" mb-4">Uploaded Notes</h4>
            {allFiles.length === 0 ? (
              <p className="text-muted fst-italic">No notes uploaded or approved yet.</p>
            ) : (
              <div className="d-flex flex-column gap-3">
                {allFiles.map((data, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center p-3 border rounded bg-light">
                    <span className="fw-medium">📄 {data.title}</span>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => showPDF(data.pdf)}
                    >
                      View PDF
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 bg-white shadow rounded">
            <h4 className=" mb-4 text-center">Upload Notes</h4>
            <form onSubmit={submitPDF} className="d-flex flex-column gap-3">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="file"
                className="form-control"
                accept="application/pdf"
                required
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <button type="submit" className="btn btn-primary w-100">
                Upload PDF
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadNotes;
