"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem } from "@/components/ui/select";

const storyOptions = [
  "タグ多め・反応多い",
  "風景や詩の投稿",
  "日常を細かく上げる",
  "ポエムや黒背景投稿",
  "発信・セミナー・報告型",
];

const typeStrategies = {
  A: {
    label: "自己演出型",
    advice: [
      "媚びずに独自視点で褒める（例：『その目線、自然でいい』）",
      "たまに距離を取ることで価値を高める",
      "他人が気づかない魅力を指摘し、優越感と安心感を与える"
    ]
  },
  B: {
    label: "感性表現型",
    advice: [
      "作品や言葉に正解を求めず、感性で反応（例：『なんか不安定でいい』）",
      "深く共鳴するが、べったりせず空気感を保つ",
      "一度だけ静かに深層心理を言い当てて余韻を残す"
    ]
  },
  C: {
    label: "日常記録型",
    advice: [
      "生活圏や価値観を共通化する（例：同じカフェに行く）",
      "『見てると落ち着く』など安心感を伝える",
      "会話では相手の話を中心にし、存在を居心地にする"
    ]
  },
  D: {
    label: "感情吐露型",
    advice: [
      "すぐ慰めない、まず“同じ温度”で反応する",
      "投稿を見た上であえてスルーし、あとで拾う",
      "安心・信頼できる居場所として存在する"
    ]
  },
  E: {
    label: "知識・活動型",
    advice: [
      "活動を過剰に褒めず、“思想”に注目する（例：『考え方が刺さった』）",
      "相手の価値を“中身”で評価し、対等に接する",
      "私生活に一歩踏み込みすぎず、感情共鳴を少しずつ作る"
    ]
  }
};

const diagnose = (bio, posts, story) => {
  const score = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  const postList = posts.split(",").map((p) => p.trim());

  if (["princess", "tokyo", "model", "beauty"].some((k) => bio.toLowerCase().includes(k))) score.A += 2;
  if (["自撮り", "スタバ", "今日のコーデ", "盛れた"].some((k) => postList.includes(k))) score.A += 2;
  if (story === "タグ多め・反応多い") score.A += 2;

  if (["art", "poetry", "感性", "音楽"].some((k) => bio.toLowerCase().includes(k))) score.B += 2;
  if (["空", "モノクロ", "詩", "アート", "花"].some((k) => postList.includes(k))) score.B += 2;
  if (story === "風景や詩の投稿") score.B += 2;

  if (["ごはん", "日常", "大学生活", "犬"].some((k) => bio.toLowerCase().includes(k))) score.C += 2;
  if (["友達とランチ", "今日の朝ごはん", "散歩", "ゆる生活"].some((k) => postList.includes(k))) score.C += 2;
  if (story === "日常を細かく上げる") score.C += 2;

  if (["人間不信", "病み", "嫌い"].some((k) => bio.toLowerCase().includes(k))) score.D += 2;
  if (["苦しい", "闇", "嫌い", "さよなら"].some((k) => postList.includes(k))) score.D += 2;
  if (story === "ポエムや黒背景投稿") score.D += 2;

  if (["起業", "自己投資", "目標", "発信"].some((k) => bio.toLowerCase().includes(k))) score.E += 2;
  if (["自己成長", "スキル", "学び", "実績"].some((k) => postList.includes(k))) score.E += 2;
  if (story === "発信・セミナー・報告型") score.E += 2;

  const maxScore = Math.max(...Object.values(score));
  const type = Object.keys(score).find((key) => score[key] === maxScore);
  return { type, score };
};

export default function SNSAnalyzer() {
  const [bio, setBio] = useState("");
  const [posts, setPosts] = useState("");
  const [story, setStory] = useState(storyOptions[0]);
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    const diagnosed = diagnose(bio, posts, story);
    setResult(diagnosed);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Input placeholder="プロフィール文を入力" value={bio} onChange={(e) => setBio(e.target.value)} />
          <Textarea placeholder="投稿キーワード（カンマ区切り）" value={posts} onChange={(e) => setPosts(e.target.value)} />
          <Select value={story} onValueChange={setStory}>
            {storyOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>
          <Button onClick={handleSubmit}>診断する</Button>
          {result && (
            <div className="pt-4 space-y-2">
              <p className="font-bold">推定タイプ：{typeStrategies[result.type].label}</p>
              <pre className="text-sm">スコア詳細: {JSON.stringify(result.score, null, 2)}</pre>
              <div>
                <p className="font-semibold">戦略的アプローチ：</p>
                <ul className="list-disc pl-5 text-sm">
                  {typeStrategies[result.type].advice.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
