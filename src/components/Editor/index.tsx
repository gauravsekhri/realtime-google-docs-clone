import Box from "@mui/system/Box";
// import Quill from "quill";
import "quill/dist/quill.snow.css";
// import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import styled from "@emotion/styled";
import "./editor.css";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import ShareDialog from "../ShareDialog";

const Comp = styled.div`
  background: #f5f5f5;
`;

const Editor = () => {
  const { quill, quillRef } = useQuill();

  const [socket, setSocket] = useState<any>();
  const [isLoadingDoc, setIsLoadingDoc] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    const socketServer = io("http://localhost:3000");
    setSocket(socketServer);

    quill?.disable();

    return () => {
      socketServer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === null || quill === null) return;

    const handleDocChange = (delta: any, oldDelta: any, source: any) => {
      let quillContents = quill?.getContents();

      const socketPayload: any = {
        docId: id,
        delta: quillContents,
      };

      if (source == "user") {
        socket.emit("doc-send-changes", socketPayload);
      }

      setTimeout(async () => {
        setIsSaving(true);
        await socket?.emit("save-doc", {
          docId: id,
          content: quillContents,
        });
        setIsSaving(false);
      }, 400);
    };

    quill?.on("text-change", handleDocChange);

    return () => {
      quill?.off("text-change", handleDocChange);
    };
  }, [quill, socket]);

  useEffect(() => {
    if (socket === null || quill === null) return;

    const handleChange = (data: any) => {
      let currentDelta: any = quill?.getContents();

      if (JSON.stringify(currentDelta) != JSON.stringify(data?.delta)) {
        quill?.setContents(data?.delta);
      }
    };

    socket && socket?.on("doc-rec-changes", handleChange);

    return () => {
      socket && socket?.off("doc-rec-changes", handleChange);
    };
  }, [quill, socket]);

  useEffect(() => {
    if (socket === null || quill === null) return;

    socket?.once("load-doc", (doc: any) => {
      quill?.setContents(doc);
      quill?.enable();
      setIsLoadingDoc(false);
    });

    socket?.emit("get-doc", id);
  }, [quill, socket]);

  // useEffect(() => {
  //   let quillContents = quill?.getContents();

  //   if (!socket || !quill || !quillContents) return;

  //   quill.on("text-change", () => {
  //     setTimeout(async () => {
  //       setIsSaving(true);
  //       await socket?.emit("save-doc", {
  //         docId: id,
  //         content: quill?.getContents(),
  //       });
  //       setIsSaving(false);
  //     }, 400);
  //   });

  //   // const interval = setTimeout(async () => {
  //   //   setIsSaving(true);
  //   //   await socket?.emit("save-doc", {
  //   //     docId: id,
  //   //     content: quill?.getContents(),
  //   //   });
  //   //   // setIsSaving(false);
  //   // }, 400);

  //   // return () => {
  //   //   clearInterval(interval);
  //   // };
  // }, [quill, socket]);

  // 8am 2pm 8pm
  // 11pm 5pm 11pm

  return (
    <>
      <Navbar isSaving={isSaving} isLoadingDoc={isLoadingDoc} />

      <Comp>
        <Box id="container" className="cont" ref={quillRef}></Box>
      </Comp>
    </>
  );
};
export default Editor;
