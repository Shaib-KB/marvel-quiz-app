// Function to show/hide answers based on answer ID
function showAnswer(answerId) {
  const answerElement = document.getElementById(answerId);
  if (answerElement) {
    answerElement.classList.toggle("hidden");
  }
}

// Function to toggle bookmark status
function toggleBookmark(questionId) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const index = bookmarks.indexOf(questionId);

  if (index > -1) {
    bookmarks.splice(index, 1); // Remove bookmark
  } else {
    bookmarks.push(questionId); // Add bookmark
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  updateBookmarkStyles();
  if (document.getElementById("bookmarked")) {
    updateBookmarkedQuestions(); // Update the bookmarked section if on the bookmarked page
  }
}

// Function to update bookmark styles on the page
function updateBookmarkStyles() {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const cards = document.querySelectorAll(".question-card");

  cards.forEach((card) => {
    const id = parseInt(card.dataset.id, 10);
    const bookmark = card.querySelector(".bookmark");
    if (bookmark) {
      if (bookmarks.includes(id)) {
        bookmark.classList.add("selected");
      } else {
        bookmark.classList.remove("selected");
      }
    }
  });
}

// Function to update the bookmarked questions section
function updateBookmarkedQuestions() {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const bookmarkedSection = document.getElementById("bookmarked-questions");

  if (!bookmarkedSection) return;

  bookmarkedSection.innerHTML = "";

  if (bookmarks.length === 0) {
    bookmarkedSection.innerHTML = "<p>No bookmarked questions.</p>";
  } else {
    bookmarks.forEach((questionId) => {
      const questionCard = document
        .querySelector(`.question-card[data-id="${questionId}"]`)
        .cloneNode(true);
      questionCard.querySelector(".bookmark").remove(); // Remove the bookmark icon from the cloned card
      bookmarkedSection.appendChild(questionCard);
    });
  }
}

// Initial setup when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  updateBookmarkStyles();
  if (document.getElementById("bookmarked")) {
    updateBookmarkedQuestions(); // Update bookmarked questions if on the bookmarked page
  }
});
