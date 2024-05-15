import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFile, setUploadStatus } from "../redux/Slices/fileSlice";
import uploadImg from "../assets/upload.png";
import "./uploaditem.css";

const UploadItem = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFilename] = useState("");
  const [description, setDescription] = useState("");
  const [allImages, setAllImages] = useState([]);
  const dispatch = useDispatch();

  const uploadStatus = useSelector((state) => state.files.uploadStatus);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", fileName);
      formData.append("description", description);

      try {
        let backendURL =
          "https://long-memory-423011-g9.de.r.appspot.com/collector/upload";
        const res = await axios.post(backendURL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            maxContentLength: 100000000,
            maxBodyLength: 1000000000,
          },
        });

        console.log(res, "UPLOAD Response");

        if (res.status == 200) {
          dispatch(
            addFile({
              name: selectedFile.name,
              type: selectedFile.type,
              size: selectedFile.size,
            })
          );

          setUploadStatus(setUploadStatus("Upload success"));
          setSelectedFile(null);
        } else {
          dispatch(setUploadStatus("Upload Failed"));
        }
      } catch (error) {
        console.error(error);
        dispatch(setUploadStatus("Upload Failed"));
      }
    }
  };

  const getImagehandler = () => {
    fetch("https://long-memory-423011-g9.de.r.appspot.com/collector/list", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "RESULET");
        setAllImages(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getImagehandler();
  }, [selectedFile]);

  useEffect(() => {
    console.log(allImages, "ALL IMAGES");
  }, [allImages]);

  const deleteButtonHandler = (id) => {
    fetch(
      `https://long-memory-423011-g9.de.r.appspot.com/collector/delete?id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "RESULT");
        setAllImages((prevData) =>
          prevData.filter((item) => item.id != result.id)
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div className="uploadItemContainer">
        <div className="fileUpload">
          <img src={uploadImg} alt="upload" />

          <h3>Click box to upload</h3>
          <input type="file" onChange={handleFileChange} />
          {selectedFile && <p>selectedFile file : {selectedFile.name}</p>}

          {["image/png", "image/jpeg"].includes(selectedFile?.type) && (
            <img
              className="previewImg"
              src={selectedFile && URL.createObjectURL(selectedFile)}
              alt=""
            />
          )}
          {uploadStatus && <p>{uploadStatus}</p>}
        </div>
        <button onClick={handleFileUpload}>Upload File</button>
      </div>
      <div className="imagesContainer">
        {allImages?.map((item) => {
          return (
            <div className="imageItem" key={item.id}>
              <img
                className="imageFromDb"
                src={`data:image/png;base64, ${item.fileData.data}`}
              />
              <div className="delete">
                <button
                  className="deleteButton"
                  onClick={() => {
                    deleteButtonHandler(item.id);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UploadItem;
