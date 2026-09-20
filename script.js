const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
const btn = document.getElementById("btnKirim");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (form.elements["_honey"].value !== "") return;

  const data = {
    nama: form.elements["nama"].value,
    email: form.elements["email"].value,
    pesan: form.elements["pesan"].value,
    _subject: "Pesan baru dari website portofolio",
    _template: "table",
    _captcha: "false"
  };

  btn.disabled = true;
  btn.textContent = "Mengirim...";
  statusEl.className = "form-status";
  statusEl.textContent = "";

  try {
    const res = await fetch("https://formsubmit.co/ajax/aldyraracmah@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    });
    const hasil = await res.json();

    if (res.ok && String(hasil.success) === "true") {
      statusEl.textContent = "Terima kasih! Pesanmu sudah terkirim.";
      statusEl.className = "form-status ok";
      form.reset();
    } else {
      throw new Error(hasil.message || "Gagal mengirim");
    }
  } catch (err) {
    statusEl.textContent = "Maaf, pesan belum terkirim. Silakan hubungi lewat email atau WhatsApp di samping.";
    statusEl.className = "form-status error";
  } finally {
    btn.disabled = false;
    btn.textContent = "Kirim pesan";
  }
});