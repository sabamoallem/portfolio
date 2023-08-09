// tiktok.js

// Function to embed a TikTok video
function embedTikTokVideo(videoUrl, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error(`Container element with ID ${containerId} not found.`);
      return;
    }
  
    const tiktokEmbedCode = `
      <blockquote class="tiktok-embed" cite="${videoUrl}">
        <section>
          <a target="_blank" title="@sabamoallem" href="${videoUrl}"></a>
        </section>
      </blockquote>
    `;
  
    container.innerHTML = tiktokEmbedCode;
  }
  
  // Example usage for paddle 1
  embedTikTokVideo("https://www.tiktok.com/@sabamoallem/video/7221744055376448810", "paddle1-container");
  // Repeat the above line for other paddles with their respective video URLs and container IDs
  