import React from "react";
import {
  MyPlantDetailIgm,
  MyPlantDetailName,
  MyPlantDetailWrap,
  MyPlantDetailNickName,
  MyPlantDetailSubName,
  MyPlantDetailDate,
  MyPlantDetailMemo,
} from "../style/DetailLayout";
import { PageBtnWrap } from "../style/Components";
import { Link } from "react-router-dom";
import { DiaryDetailContents } from "../style/DetailLayout";

const MyPlantDetail = () => {
  return (
    <MyPlantDetailWrap className="MpdWrap">
      <MyPlantDetailIgm className="img"></MyPlantDetailIgm>

      <MyPlantDetailName>식물 종류 이름</MyPlantDetailName>
      <MyPlantDetailNickName>식물 별명</MyPlantDetailNickName>
      <MyPlantDetailSubName>데려온 날짜</MyPlantDetailSubName>
      <MyPlantDetailDate>2023.06.28</MyPlantDetailDate>

      <MyPlantDetailMemo>메모</MyPlantDetailMemo>
      <DiaryDetailContents>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <PageBtnWrap>
          <li>
            <Link to="/">수정</Link>
          </li>
          <li>
            <button>삭제</button>
          </li>
        </PageBtnWrap>
      </DiaryDetailContents>
    </MyPlantDetailWrap>
  );
};

export default MyPlantDetail;
