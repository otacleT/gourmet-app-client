import { Input, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { Dispatch, FC, SetStateAction, useCallback, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useAuth } from "src/context/auth";
import { editProfile } from "src/lib/firebase/edit";

type Props = {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

export const EditProfile: FC<Props> = (props) => {
  const { isEdit, setIsEdit } = props;
  const { fbUser, user } = useAuth();
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
      editProfile(values, fbUser);
      setIsEdit(false);
      showNotification({
        message: "アカウント情報を更新しました",
        icon: <AiOutlineCheck />,
      });
    },
    [fbUser]
  );
  useEffect(() => {
    form.setValues({
      nickname: user?.nickname ?? "",
      name: user?.name ?? "",
      sex: user?.sex ?? "",
      birth: user?.birth ?? "",
      address: user?.address ?? "",
      job: user?.job ?? "",
    });
  }, [user, isEdit]);
  return (
    <form className="mt-2" onSubmit={form.onSubmit(handleSubmit)}>
      <dl className="flex justify-between items-center flex-wrap mt-2">
        <dt className="w-1/3 flex items-center justify-between text-sm mt-1 py-2">
          名前
        </dt>
        <TextInput
          className="w-[calc(66%-10px)] text-center mt-1 py-2"
          autoComplete="off"
          {...form.getInputProps("name")}
        />
        <dt className="w-1/3 text-sm mt-1 py-2">性別</dt>
        <Select
          placeholder="選択"
          nothingFound="No options"
          data={["男性", "女性"]}
          searchable
          clearable
          className="w-[calc(66%-10px)] text-center mt-1 py-2"
          {...form.getInputProps("sex")}
        />
        <dt className="w-1/3 text-sm mt-1 py-2">生年月日</dt>
        <TextInput
          placeholder="××××/××/××"
          autoComplete="off"
          className="w-[calc(66%-10px)] text-center mt-1 py-2"
          {...form.getInputProps("birth")}
        />
        <dt className="w-1/3 text-sm mt-1 py-2">住所</dt>
        <Input.Wrapper className="w-[calc(66%-10px)] text-center mt-1 py-2">
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
        <dt className="w-1/3 text-sm mt-1 py-2">職業</dt>
        <TextInput
          className="w-[calc(66%-10px)] text-center mt-1 py-2"
          autoComplete="off"
          {...form.getInputProps("job")}
        />
      </dl>
      <button
        type="submit"
        className="flex w-60 h-[40px] rounded-md mx-auto mt-3 justify-center items-center text-sm font-bold bg-[#2cb696] hover:bg-[#2cb696] text-white"
      >
        更新する
      </button>
    </form>
  );
};
