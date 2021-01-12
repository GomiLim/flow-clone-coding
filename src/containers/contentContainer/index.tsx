import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { update, favorite, selectProjects, writeContent } from 'store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

//components
import { ContentChart, ContentTicket, ContentAside } from 'components';
import { checkFavorit } from 'modules/project/favoriteProject';
import { ContentWrite } from 'components/contentWrite';

const ContentStyle = styled.div`
  display: flex;
  padding: 20px 20px;
  box-sizing: border-box;

  > div:nth-child(1) {
    width: 60%;
  }
  > div:nth-child(2) {
    width: 40%;
  }

  .project-title {
    h2 {
      line-height: 1;
      margin: 0;
    }
  }
`;
const FavoritesProjectStyle = styled(FontAwesomeIcon)`
  color: block;
  margin-right: 10px;
`;

const ContentBox = styled.div`
  width: 95%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  background: #fff;
  margin-top: 5px;
`;

const ContentContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [participantName, setParticipantName] = useState<string>('');

  const projectsList = useSelector(selectProjects);
  const writeList = useSelector(writeContent);

  const dispatch = useDispatch();
  const history = useHistory();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const productList = useSelector(selectProjects);

  function findProject(productList: any) {
    return productList.id === Number(history.location.pathname.split('/')[1]);
  }

  const addParticipants = () => {
    dispatch(
      update({
        projectid: Number(history.location.pathname.split('/')[1]),
        name: participantName,
        auth: '게스트',
      })
    );
    setIsModalVisible(false);
  };

  const selectProject = productList.find(findProject);

  const checkPin = () => {
    //상단고정
  };
  return (
    <ContentStyle>
      <div>
        <ContentBox className="project-title">
          <h2 data-id={selectProject.id}>
            <FavoritesProjectStyle
              style={{
                color: selectProject.favorites === true ? 'yellow' : 'black',
              }}
              className="favorites-project"
              icon={faStar}
              onClick={(e) => checkFavorit(e, projectsList, dispatch, favorite)}
            ></FavoritesProjectStyle>
            {selectProject.title}({selectProject.participants.length})
          </h2>
        </ContentBox>
        <ContentBox>
          <ContentChart />
        </ContentBox>
        <ContentBox>
          <ContentWrite selectProjectId={selectProject.id} participants={selectProject.participants} />
        </ContentBox>
        <ContentBox>
          <h4>상단고정글</h4>
          <ul>
            <li>
              [업무] B2B매거진 대리점현황 오류 <span>진행</span>
            </li>
          </ul>
        </ContentBox>
        {writeList &&
          writeList.map((item: any) => {
            return (
              <ContentBox>
                <p>{item.content}</p>
              </ContentBox>
            );
          })}
        <ContentBox>
          <ContentTicket checkPin={checkPin} />
          {/* {writeList &&
            writeList.map((item: any) => {
              return <p>{item.title}</p>;
            })} */}
        </ContentBox>
      </div>
      <ContentAside
        selectProject={selectProject}
        addParticipants={addParticipants}
        handleCancel={handleCancel}
        showModal={showModal}
        isModalVisible={isModalVisible}
        setParticipantName={setParticipantName}
      />
    </ContentStyle>
  );
};

export default ContentContainer;
