document.addEventListener("DOMContentLoaded", function() {
  const postGrid = document.querySelector(".post-grid");
  
  // 현재 페이지가 어떤 카테고리인지 확인 (예: engine.html -> engine)
  const currentCategory = window.location.pathname.split("/").pop().replace(".html", "");
  
  // posts.json 파일 불러오기
  fetch('posts.json')
    .then(response => response.json())
    .then(data => {
      // 현재 카테고리와 일치하는 글만 필터링
      const filteredPosts = data.filter(post => post.category === currentCategory);
      
      // 필터링된 글들을 HTML로 만들어 삽입
      filteredPosts.forEach(post => {
        const postItem = `
                    <div class="post-item">
                        <a href="${post.link}">
                            <div class="post-thumbnail" style="background-image: url('${post.thumbnail}'); background-size: cover;"></div>
                            <p>${post.title}</p>
                        </a>
                    </div>
                `;
        postGrid.innerHTML += postItem;
      });
      
      // 만약 글이 하나도 없다면 안내 문구 표시
      if (filteredPosts.length === 0) {
        postGrid.innerHTML = "<p>아직 작성된 글이 없습니다.</p>";
      }
    });
});