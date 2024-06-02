//연극의 장르와 관객 규모를 기초로 비용 책정
//공연료와 별개로 포인트 지급
//다음 의뢰시 공연료 할인 받을 수 있음

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${data.customer}\n`;
  const format = new Intl.Number("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    //포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    //희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === perf.type) volumeCredits += Math.floor(perf.audience / 5);
    //청구 내역을 출력한다.
    result += `총액: ${usd(totalAmount())}\n`;
    result += `적립 포인트 : ${volumeCredits}점\n`;
    return result;
  }
}
