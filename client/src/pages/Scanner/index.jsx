import { QrReader } from "@cmdnio/react-qr-reader";
import { useState } from "react";

export default function Scanner() {
  const [data, setData] = useState("No result");

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            setData(result?.text);
          }
          if (error) {
            console.info(error);
          }
        }}
        style={{ width: "100%" }}
        constraints={{ facingMode: "environment" }}
      />
      <p>{data}</p>
    </>
  );
}
