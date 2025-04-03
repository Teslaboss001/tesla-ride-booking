// 模擬 Welcome 畫面與金額顯示（實作部分需由 index.html 連結此區塊）
document.getElementById('calculateBtn')?.addEventListener('click', async function () {
  const pickup = document.getElementById('pickup')?.value;
  const dropoffs = Array.from(document.querySelectorAll('input[name=dropoff]')).map(el => el.value).filter(Boolean);
  const vehicle = document.getElementById('vehicleType')?.value;
  const time = document.getElementById('rideTime')?.value;

  if (!pickup || dropoffs.length === 0) {
    alert('請輸入上車與下車地址');
    return;
  }

  const addresses = [pickup, ...dropoffs];
  let totalDistance = 0;

  for (let i = 0; i < addresses.length - 1; i++) {
    const origin = addresses[i];
    const destination = addresses[i + 1];
    const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=AIzaSyBYhjHSQTm68K_dnKgiiWFGRWX2RBiJMhQ`);
    const data = await response.json();
    if (data.rows[0].elements[0].status === "OK") {
      const distanceInMeters = data.rows[0].elements[0].distance.value;
      totalDistance += distanceInMeters / 1000; // convert to km
    }
  }

  let baseFare = (totalDistance * 30 + 85) * 1.4;
  const hour = parseInt(time.split(":")[0]);
  if ((hour >= 23 && hour <= 24) || (hour >= 0 && hour < 6)) {
    baseFare *= 1.2;
  }

  if (vehicle === "五人座" && baseFare < 500) baseFare = 500;
  if (vehicle === "七人座" && baseFare < 800) baseFare = 800;

  // 顯示畫面切換
  document.querySelector('.hero')?.style.setProperty("display", "none");
  document.getElementById('normalRideSection')?.style.setProperty("display", "none");
  document.getElementById('finalMap')?.style.setProperty("display", "none");
  document.getElementById('welcomeSection')?.classList.remove('hidden');

  document.getElementById('fareAmount').textContent = `NT$ ${Math.round(baseFare)}`;
});