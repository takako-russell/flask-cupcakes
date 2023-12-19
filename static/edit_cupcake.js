BASE_URL = "http://localhost:5000/api";

async function handleEdit() {
  let id = $("#cupcake-id").val();
  const res = await axios.patch(`${BASE_URL}/cupcakes/${id}`, {
    flavor: $("#edit-flavor").val(),
    size: $("#edit-size").val(),
    rating: $("#edit-rating").val(),
    image: $("#edit-img").val(),
  });

  $(location).prop("href", "/");
}
