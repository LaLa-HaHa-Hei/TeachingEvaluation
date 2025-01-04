document.querySelector('#start-evalute-btn').addEventListener('click', () => {
    // 查询当前活动标签页
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // 获取活动标签页的 ID
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id, allFrames: true },
            files: ['content.js'] // 注入 content.js
        });
    });
});
