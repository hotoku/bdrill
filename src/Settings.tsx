import React from "react";
import styled from "styled-components";
import { getBytes } from "./db";

function Settings(): React.ReactElement {
  const handleDownload = async () => {
    const db = await getBytes();
    console.log("bytes length: ", db.length);
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
