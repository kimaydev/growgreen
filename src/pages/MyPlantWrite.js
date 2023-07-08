import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment/moment";
import { ConfigProvider, Form, Input, DatePicker, Upload, Modal } from "antd";
import { MyPlantWriteFir, MyPlantWriteTxt } from "../style/WriteLayout";
import { mainColor } from "../style/GlobalStyle";
import { PageBtnWrap } from "../style/Components";
import { postPlants } from "../api/patchmyplant";

const MyPlantWrite = () => {
  // 날짜 선택에 오늘 날짜 표시
  const [nowDate, setNowDate] = useState(new Date());
  const nowFormatDate = moment(nowDate).format("YYYY-MM-DD");
  // 데려온 날짜
  const dateFormat = "YYYY-MM-DD";

  // 화면이동
  const navigate = useNavigate();

  // 이미지 업로드
  const getBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };
  const handleChange = ({ fileList }) => setFileList(fileList.slice(-1));
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>사진 업로드</div>
    </div>
  );

  // 메모
  const [value, setValue] = useState("");
  const { TextArea } = Input;

  const WritePut = {
    nm: "",
    nickNm: "",
    onDate: "",
    ctnt: "",
  };

  // plant state
  const [writeData, setWriteData] = useState(WritePut);

  const [formErrors, setFormErrors] = useState({});

  const handleConfirm = () => {
    // 식물 종류가 입력되지 않았을 때 에러 처리
    const errors = {};
    if (!writeData.nm) {
      errors.nm = "* 식물 종류를 작성해주세요.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    console.log("확인");
    postPlants(writeData);
    navigate("/myplantlist");
  };

  // 식물 이름
  const onFinish = values => {
    console.log(fileList);
    values.onDate = moment(values.onDate).format("YYYY-MM-DD");
    // dto 데이터
    const dto = {
      nm: values.nm,
      nickNm: values.nickNm,
      onDate: values.onDate,
      ctnt: values.ctnt,
    };

    // 이미지 업로드
    const formData = new FormData();
    formData.append("img", fileList[0]?.originFileObj);
    // formData.append("dto", JSON.stringify(dto));
    formData.append(
      "dto", //data pk명
      new Blob([JSON.stringify(dto)], {
        type: "application/json",
      }),
    );

    postPlants(formData);
  };
  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: mainColor.colorGreenRegular,
            fontFamily:
              '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
          },
        }}
      >
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ onDate: dayjs(nowFormatDate, dateFormat) }}
        >
          {/* 식물 종류 */}
          <MyPlantWriteFir>
            <MyPlantWriteTxt>식물 종류</MyPlantWriteTxt>
            <Form.Item
              name="nm"
              validateStatus={formErrors.nm ? "error" : ""}
              help={formErrors.nm && <div style={{ color: "red" }}>{formErrors.nm}</div>}
            >
              <Input placeholder="키우는 반려 식물 종류를 작성해주세요." />
            </Form.Item>
          </MyPlantWriteFir>
          {/* 식물 애칭 */}
          <MyPlantWriteFir>
            <MyPlantWriteTxt>식물 애칭</MyPlantWriteTxt>
            <Form.Item name="nickNm">
              <Input placeholder="반려 식물의 애칭을 작성해 주세요." />
            </Form.Item>
          </MyPlantWriteFir>
          {/* 데려온 날짜 */}
          <MyPlantWriteFir>
            <MyPlantWriteTxt>데려온 날짜</MyPlantWriteTxt>
            <Form.Item name="onDate">
              <DatePicker />
            </Form.Item>
          </MyPlantWriteFir>
          {/* 식물 사진 */}
          <MyPlantWriteFir>
            <MyPlantWriteTxt>
              식물 사진
              <p>* 최대 5MB의 이미지 확장자 파일(.jpeg, .png, .gif)만 업로드 가능합니다.</p>
            </MyPlantWriteTxt>
            <Form.Item name="img">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length === 0 && uploadButton}
              </Upload>
            </Form.Item>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </MyPlantWriteFir>
          {/* 메모 */}
          <MyPlantWriteFir>
            <MyPlantWriteTxt>메모</MyPlantWriteTxt>
            <Form.Item name="ctnt">
              <TextArea
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="메모를 입력해주세요."
              />
            </Form.Item>
          </MyPlantWriteFir>
          {/* 확인, 취소 버튼 section */}
          <PageBtnWrap>
            <li>
              <button onClick={handleConfirm}>확인</button>
            </li>
            <li>
              <button onClick={() => navigate("/myplantlist")}>취소</button>
            </li>
          </PageBtnWrap>
        </Form>
      </ConfigProvider>
    </>
  );
};

export default MyPlantWrite;
