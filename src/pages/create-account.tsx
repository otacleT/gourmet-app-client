import { Input, Select, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { ResponsiveTxt } from "src/component/ResponsiveTxt";
import { useAuth } from "src/context/auth";
import { db } from "src/lib/firebase/init";

const CreateAccount = () => {
  const { user, fbUser, isLoading } = useAuth();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      nickname: "",
      name: "",
      sex: "",
      birth: "",
      address: "",
      job: "",
    },
  });
  const handleSubmit = useCallback(
    async (values: typeof form.values) => {
      if (!fbUser) return;
      const ref = doc(db, `users/${fbUser.uid}`);
      setDoc(ref, { ...values });
      showNotification({
        message: "アカウント情報を保存しました",
        icon: <AiOutlineCheck />,
      });
    },
    [fbUser]
  );
  if (isLoading) {
    return <div className="loading"></div>;
  }
  if (!fbUser) {
    router.push("/login");
    return null;
  }
  if (user) {
    router.push("/map");
    return null;
  }

  return (
    <main>
      <ResponsiveTxt />
      <div className="hidden md:block max-w-xl mx-auto pt-20">
        <h1 className="text-2xl text-center font-bold">アカウント作成</h1>
        <form className="mt-10" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            required
            label="ニックネーム"
            autoComplete="off"
            {...form.getInputProps("nickname")}
          />
          <Space h="md" />
          <TextInput
            label="氏名"
            autoComplete="off"
            {...form.getInputProps("name")}
          />
          <Space h="md" />
          <Select
            label="性別"
            placeholder="選択"
            nothingFound="No options"
            data={["男性", "女性"]}
            searchable
            clearable
            {...form.getInputProps("sex")}
          />
          <Space h="md" />
          <TextInput
            label="生年月日"
            placeholder="××××/××/××"
            autoComplete="off"
            {...form.getInputProps("birth")}
          />
          <Space h="md" />
          <Input.Wrapper label="現住所">
            <Input component="select" {...form.getInputProps("address")}>
              <option value="住所を入力"></option>
              <option value="北海道">北海道</option>
              <option value="青森県">青森県</option>
              <option value="岩手県">岩手県</option>
              <option value="宮城県">宮城県</option>
              <option value="秋田県">秋田県</option>
              <option value="山形県">山形県</option>
              <option value="福島県">福島県</option>
              <option value="茨城県">茨城県</option>
              <option value="栃木県">栃木県</option>
              <option value="群馬県">群馬県</option>
              <option value="埼玉県">埼玉県</option>
              <option value="千葉県">千葉県</option>
              <option value="東京都">東京都</option>
              <option value="神奈川県">神奈川県</option>
              <option value="新潟県">新潟県</option>
              <option value="富山県">富山県</option>
              <option value="石川県">石川県</option>
              <option value="福井県">福井県</option>
              <option value="山梨県">山梨県</option>
              <option value="長野県">長野県</option>
              <option value="岐阜県">岐阜県</option>
              <option value="静岡県">静岡県</option>
              <option value="愛知県">愛知県</option>
              <option value="三重県">三重県</option>
              <option value="滋賀県">滋賀県</option>
              <option value="京都府">京都府</option>
              <option value="大阪府">大阪府</option>
              <option value="兵庫県">兵庫県</option>
              <option value="奈良県">奈良県</option>
              <option value="和歌山県">和歌山県</option>
              <option value="鳥取県">鳥取県</option>
              <option value="島根県">島根県</option>
              <option value="岡山県">岡山県</option>
              <option value="広島県">広島県</option>
              <option value="山口県">山口県</option>
              <option value="徳島県">徳島県</option>
              <option value="香川県">香川県</option>
              <option value="愛媛県">愛媛県</option>
              <option value="高知県">高知県</option>
              <option value="福岡県">福岡県</option>
              <option value="佐賀県">佐賀県</option>
              <option value="長崎県">長崎県</option>
              <option value="熊本県">熊本県</option>
              <option value="大分県">大分県</option>
              <option value="宮崎県">宮崎県</option>
              <option value="鹿児島県">鹿児島県</option>
              <option value="沖縄県">沖縄県</option>
            </Input>
          </Input.Wrapper>
          <Space h="md" />
          <TextInput
            label="職業"
            autoComplete="off"
            {...form.getInputProps("job")}
          />
          <Space h="md" />
          <button className="w-full py-3 rounded-md flex justify-center items-center text-lg bg-[#333] text-white">
            更新
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateAccount;
