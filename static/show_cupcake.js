BASE_URL = "http://localhost:5000/api";

function generateCupcake(cupcake) {
  return `<div id="cake-${cupcake.id}" class="col-2">
            <div>${cupcake.flavor}/${cupcake.size}/${cupcake.rating}
                <button class="delete-btn" id="delete-btn-${cupcake.id}">X</button>
                
            </div>
            <div>
                <img width="100" height="100" src="${cupcake.image}"/>
            </div>
            <button type="button" class="edit-btn btn btn-outline-info btn-sm" id="edit-btn-${cupcake.id}">Edit</button>
            </div>
             
          </div>`;
}

async function showCupcakes() {
  const res = await axios.get(`${BASE_URL}/cupcakes`);

  for (let cupcake of res.data.cupcakes) {
    let newCupcake = $(generateCupcake(cupcake));
    $(".list-cupcake").append(newCupcake);
    registerDelete(cupcake.id);
    registerEdit(cupcake.id);
  }
}

$("#newcupcake-form").on("submit", async function (evt) {
  evt.preventDefault();

  let flavor = $("#add-flavor").val();
  let size = $("#add-size").val();
  let rating = $("#add-rating").val();
  let image = $("#add-img").val();

  const res = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor: flavor,
    size: size,
    rating: rating,
    image: image,
  });

  console.log(res);

  let newCupcake = $(generateCupcake(res.data.cupcake));
  $(".list-cupcake").append(newCupcake);
  registerDelete(res.data.cupcake.id);
  registerEdit(res.data.cupcake.id);
  $("#newcupcake-form").trigger("reset");
});

let registerDelete = function (id) {
  $(document).on("click", `#delete-btn-${id}`, async function (evt) {
    evt.preventDefault();
    let $targetCupcake = $(`#cake-${id}`);

    await axios.delete(`${BASE_URL}/cupcakes/${id}`);

    $targetCupcake.remove();
  });
};

let registerEdit = function (id) {
  $(document).on("click", `#edit-btn-${id}`, async function (evt) {
    evt.preventDefault();
    $(location).prop("href", `/api/cupcakes/${id}`);
  });
};

$(document).ready(function () {
  $(showCupcakes);

  console.log("clicked");
});
