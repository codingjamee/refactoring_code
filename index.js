//연극의 장르와 관객 규모를 기초로 비용 책정
//공연료와 별개로 포인트 지급
//다음 의뢰시 공연료 할인 받을 수 있음

import createStatementData from "./createStatementData";

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data, plays) {
  let result = `청구내역 (고객명: ${data.customer}\n`;
  for (let perf of data.performances) {
    //청구 내역을 출력한다.
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }
  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트 : ${data.totalVolumeCredits()}점\n`;
  return result;

  function volumeCreditsFor(perf) {
    //포인트를 적립한다.
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    //희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === perf.play.type) result += Math.floor(perf.audience / 5);
    return result;
  }
  function usd(aNumber) {
    return new Intl.Number("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }
  function totalVolumeCredits() {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
  function totalAmount() {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}



//결과 화면
//청구내역 (고객명 : BigCo)
//Hamlet : $650.00(55석)
//As You Like It: $580.00(35석)
//Othello: %500.00(40석)
//총액: $1,730.00
//적립포인트: 47점
