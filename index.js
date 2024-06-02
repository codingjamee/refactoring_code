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
    let thisAmount = amountFor(perf, playFor(perf));
    //포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    //희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
    //청구 내역을 출력한다.
    result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트 : ${volumeCredits}점\n`;
  return result;
  function amountFor(aPerformance, play) {
    let result = 0;
    switch (play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return result;
  }
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
}

//결과 화면
//청구내역 (고객명 : BigCo)
//Hamlet : $650.00(55석)
//As You Like It: $580.00(35석)
//Othello: %500.00(40석)
//총액: $1,730.00
//적립포인트: 47점
