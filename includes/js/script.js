const result = document.getElementById("result");
const more = document.getElementById("more");

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }
// const apiURL = "https://clist.by";

async function getData() {
    const res = await fetch(`https://clist.by:443/api/v1/contest/?username=mo-jo-dev&api_key=0965da70e684b0485eedc5cf7209098afe12519a&limit=15&offset=0&start__gte=${formatDate(new Date())}&order_by=start&duration__lt=999999`, {method: 'get'});
    const data = await res.json();
    console.log(data);
    showData(data);
}

function findPlatform(data){
  if(data == 'codeforces.com'){
    return 'assets/img/codeforces.png'
  }
  if(data == 'codingninjas.com/codestudio'){
    return 'assets/img/codingninjas.png'
  }
  if(data == 'atcoder.jp'){
    return 'assets/img/atcoder.png'
  }
  if(data == 'codechef.com'){
    return 'assets/img/codechef.png'
  }
  if(data == 'dmoj.ca'){
    return 'assets/img/dmoj.png'
  }
}

function showData(data){
    result.innerHTML = `
    <div class="box">
      <ul class="test">
          ${data.objects.map(
              code => `
              <li class="list"><span>
              <strong>${code.event.toUpperCase()}</strong>
              - ${code.resource.name}
              </span>
              <h3 class="btn"><a href="${code.href}" target="_blank"><img class = "comp_icon" src = "${findPlatform(code.resource.name)}"></a></h3>
              </li>
              `
          ).join('')}
      </ul>
    </div>
    `;
}

getData();
