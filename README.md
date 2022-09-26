## 信頼度に応じた飲食店評価アプリ

https://user-images.githubusercontent.com/80461281/190844614-3b68ff13-f3a7-496d-b67b-9b4a16e6ee2e.mp4

### アプリの概要
技育展2022で登壇し、**優秀賞**をいただくことができました。   
食べログの訴訟問題で明らかになった既存のグルメサービスの問題を解決するために、ブロックチェーン技術を用いてグルメサービスを実装しました。UIにはMapboxを使用しており、お店の評価点に応じてマーカーサイズを調整することで人気の飲食店を効率よく探せるよう工夫を行いました。

### URL
https://gourmet-app.vercel.app   
（Metamaskのインストールが必要です）

### 解決したい社会課題

少し前に食べログが評価アルゴリズムの一方的な変更を行ったことで、飲食店と訴訟問題になったというニュースがありました。このニュースで明らかになった問題点として大きく以下の３つが挙げられます。
- 評価点を下方修正するような評価アルゴリズムの変更
- 評価アルゴリズムのブラックボックス化
- 評価点の不透明さ

評価点はお店を選ぶ基準のひとつであり、すべてのユーザーが公平でかつ信頼できる情報であるべきです。   
   
**そのような情報を運営であれば変更できてもいいのでしょうか、、？**   
   
そこで私は、ブロックチェーン技術を用いて評価アルゴリズムを公開し、運営であっても変更することができない状態にすることで、この問題を解決できるのではないかと考えました。

|**既存のグルメサービスの仕組み** | **提案する仕組み** |
|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/80461281/192281874-ddf602e2-0f91-4822-9396-b8c439dcedd9.JPG" /> | <img src="https://user-images.githubusercontent.com/80461281/192281912-99ffbf21-934b-465a-b39b-060f87621a49.JPG" /> |
|ユーザーは見ることができず、運営は変更できる | 誰もが見ることができ、誰も変更することができない |

### 技術スタック

<img src="https://user-images.githubusercontent.com/80461281/190845647-d6850e55-c6c7-41fa-8d47-d84d6c7d92ce.png" alt="技術スタック" width="600px">

### 関連情報

#### 評価アルゴリズム

https://github.com/otacleT/gourmet-app/

#### 技育展2022 登壇資料

https://speakerdeck.com/otaclet/gourmet-app
