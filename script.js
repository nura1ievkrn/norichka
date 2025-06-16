
const gallery = document.getElementById('gallery');
UPLOADCARE_PUBLIC_KEY = '0d7b94752846953b9908'; // Замените на свой ключ!

const widget = uploadcare.Widget('[role=uploadcare-uploader]');

widget.onUploadComplete(fileInfo => {
  addImageToGallery(fileInfo.cdnUrl);
  saveToStorage(fileInfo.cdnUrl);
});

function addImageToGallery(url) {
  const wrapper = document.createElement('div');
  wrapper.className = 'image-wrapper';

  const img = document.createElement('img');
  img.src = url;
  img.className = 'gallery-item';

  const btn = document.createElement('button');
  btn.innerText = '❌';
  btn.className = 'delete-btn';
  btn.onclick = () => {
    wrapper.remove();
    removeFromStorage(url);
  };

  wrapper.appendChild(img);
  wrapper.appendChild(btn);
  gallery.appendChild(wrapper);
}

function saveToStorage(url) {
  const saved = JSON.parse(localStorage.getItem('norichka_uploadcare_photos') || '[]');
  saved.push(url);
  localStorage.setItem('norichka_uploadcare_photos', JSON.stringify(saved));
}

function removeFromStorage(url) {
  let saved = JSON.parse(localStorage.getItem('norichka_uploadcare_photos') || '[]');
  saved = saved.filter(item => item !== url);
  localStorage.setItem('norichka_uploadcare_photos', JSON.stringify(saved));
}

function loadGallery() {
  const saved = JSON.parse(localStorage.getItem('norichka_uploadcare_photos') || '[]');
  saved.forEach(url => addImageToGallery(url));
}

loadGallery();
