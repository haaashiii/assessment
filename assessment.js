'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子をすべて削除する関数
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
}

assessmentButton.onclick = () => {
    const username = userNameInput.value;
    if (username.length === 0) {
        return;
    }
    console.log(username);
    // TODO 診断結果表示エリアの作成
    removeAllChildren(resultDivided);

    const header = document.createElement('h3');
    header.innerText= '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(username);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
   
    // TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    +encodeURIComponent('あなたのいいところ')
    +'&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);

    // widget.js　の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};
const answers = [
    '{username}のいいとこは声です。{username}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{username}のいいとこはまなざしです。{username}に見つめられた人は、気になって仕方ないでしょう。',
    '{username}のいいとこは情熱です。{username}の情熱に周りの人は感化されます。',
    '{username}のいいとこは厳しさです。{username}の厳しさはいつも物事を成功に導きます。',
    '{username}のいいとこは知識です。博識な{username}は多くの人に頼られます。',
    '{username}のいいとこはユニークさです。{username}だけの特徴は皆を楽しませます。',
    '{username}のいいとこは用心深さです。{username}の洞察力の高さに多くの人が助けられます。',
    '{username}のいいとこは見た目です。内側から溢れる{username}の良さに皆が気を惹かれます。',
    '{username}のいいとこは決断力です。{username}は的確かつ非情な決断を下します。',
    '{username}のいいとこはおもいやりです。{username}に気をかけてもらった多くの人が感謝しています。',
    '{username}のいいとこは節度です。強引過ぎない{username}のかんがえに多くの人が救われています。',
    '{username}のいいとこは好奇心です。新しい物好きな{username}のアイデアには皆が驚かされます。',
    '{username}のいいとこは気配りです。何気ない{username}の気配りには多くの人が感心しています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
    '{username}のいいとこはそのすべてです。すこ。'
];



/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} username ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(username) {
    // 名前の全文字のコード番号を取得して合計する
    let sunOfCharCode = 0;
    for (let i = 0; i < username.length; i++) {
        sunOfCharCode = sunOfCharCode + username.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答パターン数で割ってその余りを添え字とする
    const index = sunOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{username\}/g, username);
    return result;
}

//テストコード
console.assert(
    assessment('たかし') === assessment('たかし'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません'
)
