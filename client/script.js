const s3endpoint = 'http://192.168.1.47:9000';
const s3bucket = 'images';

let presignedUrl;
let fileNameInput;

const $button = document.getElementById("presignedButton");
const $fileNameInput = document.getElementById("file-name");
const $presignedUrlSpan = document.getElementById("presignedUrl");
const $uploadButton = document.getElementById("uploadButton");

$button.addEventListener("click", async ()=> {
    fileNameInput = $fileNameInput.value;
    if (fileNameInput)
    {
        presignedUrl = await getPreSignedUploadUrl(s3bucket, fileNameInput);
        $presignedUrlSpan.innerText = presignedUrl;
    }
});

$uploadButton.addEventListener("click", async ()=> 
{
    let $imageFile = document.getElementById("image-file").files[0];
    uploadImage($imageFile, presignedUrl);
    const $link = document.createElement("a");
    $link.innerHTML = `${s3endpoint}/${s3bucket}/${fileNameInput}`;
    $link.setAttribute('href', `${s3endpoint}/${s3bucket}/${fileNameInput}`);
    $link.setAttribute('target', '_blank');

    const $image = document.createElement("img");
    $image.setAttribute("src", `${s3endpoint}/${s3bucket}/${fileNameInput}`);

    $link.appendChild($image);

    document.body.appendChild($link);
});

