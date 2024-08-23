import React from "react";
import styled from "styled-components";
import { getBytes } from "./db/core";

function Settings(): React.ReactElement {
  console.log("settings");
  const handleDownload = async () => {
    const byteArray = await getBytes();
    const blob = new Blob([byteArray.buffer], {
      type: "application/x-sqlite3",
    });
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(blob);
    a.download = "db.sqlite";
    a.addEventListener("click", function () {
      setTimeout(function () {
        console.log("Exported (possibly auto-downloaded) database");
        window.URL.revokeObjectURL(a.href);
        a.remove();
      }, 500);
    });
    a.click();
  };

  return (
    <Base>
      <h2>settings</h2>
      <DownloadButton onClick={handleDownload}>Download</DownloadButton>
    </Base>
  );
}

export default Settings;

const Base = styled.div`
  margin: var(--small-gap);
  padding: var(--small-gap);
`;

const DownloadButton = styled.button``;
