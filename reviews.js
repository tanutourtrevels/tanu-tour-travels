document.getElementById("submitReview").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const rating = parseInt(document.getElementById("rating").value);
  const review = document.getElementById("review").value;

  if (!name || !review) {
    alert("नाम और Review भरें");
    return;
  }

  const { error } = await supabase
    .from("reviews")
    .insert([
      {
        name: name,
        rating: rating,
        review: review,
        approved: false
      }
    ]);

  if (error) {
    alert("Review submit नहीं हुआ");
    console.error(error);
  } else {
    alert("धन्यवाद! आपका Review भेज दिया गया है।");
    document.getElementById("name").value = "";
    document.getElementById("review").value = "";
    document.getElementById("rating").value = "5";
  }
});
