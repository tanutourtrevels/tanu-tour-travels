async function loadReviews() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  const list = document.getElementById("reviewList");
  list.innerHTML = "";

  data.forEach(r => {
    list.innerHTML += `
      <div style="background:#fff;color:#000;padding:15px;margin:10px 0;border-radius:10px">
        <b>${r.name}</b><br>
        ⭐ ${r.rating}/5<br>
        ${r.review}
      </div>
    `;
  });
}

document.getElementById("submitReview").addEventListener("click", async () => {
  try {
    const name = document.getElementById("name").value.trim();
    const rating = Number(document.getElementById("rating").value);
    const review = document.getElementById("review").value.trim();

    if (!name || !review) {
      alert("नाम और Review भरें");
      return;
    }

    const { error } = await supabase.from("reviews").insert([
      {
        name,
        rating,
        review,
        approved: false
      }
    ]);

    if (error) throw error;

    alert("Review सफलतापूर्वक भेज दिया गया।");

    document.getElementById("name").value = "";
    document.getElementById("review").value = "";
    document.getElementById("rating").value = "5";

    loadReviews();

  } catch (err) {
    alert(err.message);
    console.log(err);
  }
});

loadReviews();
