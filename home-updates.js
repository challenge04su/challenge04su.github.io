document.addEventListener("DOMContentLoaded", function() {
  fetch('posts.json')
    .then(response => response.json())
    .then(data => {
      const categories = ['engine', 'programming', 'troubleshooting', 'portfolio'];
      
      categories.forEach(cat => {
        // 해당 카테고리 글 필터링
        const categoryPosts = data.filter(post => post.category === cat);
        
        if (categoryPosts.length > 0) {
          // 가장 마지막에 추가된 글이 최신글
          const latestPost = categoryPosts[categoryPosts.length - 1];
          const card = document.getElementById(`home-${cat}`);
          
          // 1. 썸네일 이미지 적용
          const thumbBox = card.querySelector('.thumbnail-box');
          thumbBox.style.backgroundImage = `url('${latestPost.thumbnail}')`;
          thumbBox.style.backgroundSize = 'cover';
          thumbBox.style.backgroundPosition = 'center';
          thumbBox.innerText = ''; // "최근 글 없음" 텍스트 제거
          
          // 2. 제목 텍스트 적용
          const titleElement = card.querySelector('.latest-title');
          titleElement.innerText = latestPost.title;
        }
      });
    })
    .catch(err => console.error("데이터를 불러오는 중 오류 발생:", err));
});