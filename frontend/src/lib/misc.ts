export const loadScript = (url: string) =>
  new Promise((resolve, reject) => {
    let ready = false;
    if (!document) {
      reject(new Error("Document was not defined"));
    }
    const tag = document.getElementsByTagName("script")[0];
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.src = url;
    script.async = true;

    script.onload = resolve;

    script.onerror = (msg) => {
      console.log(msg);
      reject(new Error("Error loading script."));
    };

    script.onabort = (msg) => {
      console.log(msg);
      reject(new Error("Script loading aboirted."));
    };

    if (tag.parentNode != null) {
      tag.parentNode.insertBefore(script, tag);
    }
  });
