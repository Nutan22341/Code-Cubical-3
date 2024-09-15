let btn = document.getElementById("summarize");
btn.addEventListener("click", (event) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error("No active tab found.");
      return;
    }
    console.log(tabs);
    tab_url = tabs[0].url;
    console.log(tabs[0].url);
    async function fetch_data() {
      console.log("Hello");
      const url = `https://extractorapi.com/api/v1/extractor/?apikey=de070375909a4b85d4aaf1e2d8b5f36328adaef9&url=${tab_url}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.log("Bad Response!!!");
          throw new Error(response.status);
        }
        const json_format = await response.json();
        console.log(json_format);
        console.log("json ");
        console.log(json_format.text);
        const url1 = `https://api.ai21.com/studio/v1/summarize`;
        const AI21_API_KEY = "zyheVVq6t6gbkNIZlaGVfmTkVOFP6QO7";
        const extracted_data = json_format.text;
        const new_data = extracted_data.substring(0, 40000);

        const rsp = await fetch(url1, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${AI21_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source: new_data,
            sourceType: "TEXT",
          }),
        });

        if (!rsp.ok) {
          throw new Error(`HTTP error! status: ${rsp.status}`);
        }

        const data = await rsp.json();
        console.log(data);
        console.log(data.summary);
        const myHeaders = new Headers();
        myHeaders.append("apikey", "yC8jMC2Nm4s3jBjlXsji9eQ9XzYpaCqK");

        const raw = JSON.stringify({ body: data.summary });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        const languageSelect = document.getElementById("language");
        const selectedLanguage = languageSelect.value;
        targetLanguage = selectedLanguage;
        sourceLanguage = "en";

        let translate_url = `https://api.apilayer.com/language_translation/translate?target=${targetLanguage}`;
        if (sourceLanguage) {
          translate_url += `&source=${sourceLanguage}`;
        }
        const translate_response = await fetch(translate_url, requestOptions);
        const result = await translate_response.json();
        console.log(result);
        const parsedTranslation = (result.translations[0].translation);
        console.log("Translation:", parsedTranslation);
        localStorage.setItem("summary", parsedTranslation);

        // Open new tab with summary.html
        chrome.tabs.create({ url: "summary.html" });
        
      } catch (e) {
        console.log(e);
      }
    }
    fetch_data();
    
  });
});
