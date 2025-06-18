import React, { useState } from "react";
import "./File.css";

const File = () => {
  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");

  const handleFileChange = (e) => {
    const setfile = e.target.files[0];
    console.log(setfile.size);
    if (setfile.size / 1048576 < 5) {
      if (setfile) setFile(setfile);
    } else {
      alert("select a file less than 5MB");
      return;
    }
  };
  const handleFile = async (e) => {
    e.preventDefault();

    const fileData = new FormData();
    fileData.append("file", file);

    try {
      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: fileData,
      });
      console.log(file.size);

      const data = await res.json();
      console.log(data);
      console.log(data.message);
      setDownloadLink(data.downloadURL);
    } catch (err) {
      console.error("Error uploading file:", err);
    }
    alert("file uploaded sucessfully");
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleFile} encType="multipart/form-data">
        <div className="upload-box">
          <h2>Upload and attach files</h2>
          <p>Attachments will be part of this project.</p>

          <div className="upload-area">
            <input
              type="file"
              name="avatar"
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor="fileInput"
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <i style={{ fontSize: "24px" }}>📁</i>
              <p>
                <a>Click to Upload</a>
                <br />
                <span style={{ fontSize: "12px", color: "#aaa" }}>
                  (Max. File size: 5 MB)
                </span>
              </p>
            </label>
            {file && (
              <div className="file-preview">
                <p>
                  <strong>Selected File:</strong> {file.name}
                </p>

                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="preview-image"
                />
              </div>
            )}
          </div>
          <div>
            {downloadLink && (
              <div>
                <h2>👇🏻 Download the file</h2>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",border: "1px solid white",marginBottom: "1rem",borderRadius:"10px"}}>
                <p style={{marginInline:"9px"}}>{downloadLink}</p>
                  <svg style={{marginInline:"9px"}}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="antiquewhite"
                    className="bi bi-clipboard"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          {/* <div className="file-list">
            <div className="file-item">
              <div>
                <div className="file-name">Equal estim.pdf</div>
                <div className="progress-bar">
                  <div className="progress" style={{width: "65%"}}></div>
                </div>
              </div>
              <div className="file-status">2 sec left</div>
            </div>

            <div className="file-item">
              <div>
                <div className="file-name">Equal logo.img</div>
                <div className="progress-bar">
                  <div className="progress" style={{width: "42%"}}></div>
                </div>
              </div>
              <div className="file-status">2 sec left</div>
            </div>

            <div className="file-item">
              <div>
                <div className="file-name">UX process Workshop.FIG</div>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{width: "100%", background: "#4caf50;"}}
                  ></div>
                </div>
              </div>
              <div className="file-status" style={{color: "#4caf50"}}>
                Completed
              </div>
            </div>
          </div> */}
          <div className="actions">
            <button type="reset" className="btn btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn btn-attach">
              Attach files
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default File;
