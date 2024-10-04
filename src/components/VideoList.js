import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./VideoList.css";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [filterTag, setFilterTag] = useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const fetchedVideos = await api.getVideos();
      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const sortedVideos = videos.sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  const filteredVideos = filterTag
    ? sortedVideos.filter((video) => video.tags.includes(filterTag))
    : sortedVideos;

  return (
    <div className="container video-list-container">
      <h2>My Videos</h2>
      <div className="video-controls">
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="date">Sort by Date</option>
        </select>
        <input
          type="text"
          placeholder="Filter by tag"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        />
      </div>
      <ul className="video-list">
        {filteredVideos.map((video) => (
          <li key={video.id} className="video-item">
            <h3>{video.title}</h3>
            <p>Date: {new Date(video.date).toLocaleDateString()}</p>
            <p>Tags: {video.tags.join(", ")}</p>
            <button onClick={() => window.open(video.url, "_blank")}>
              Watch
            </button>
            <button onClick={() => window.open(video.downloadUrl, "_blank")}>
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
// The VideoList component is already implemented in the provided code.
// It includes sorting by date and filtering by tags.
// No additional code is needed for this functionality.
