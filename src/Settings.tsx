import React from "react";
import styled from "styled-components";
import { getDatabase } from "./db";

function Settings(): React.ReactElement {
  const handleDownload = async () => {
    const db = await getDatabase();
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
