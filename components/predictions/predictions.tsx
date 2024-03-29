import styled from "styled-components";

const PredictionList = styled.ul`
  top: 270px;
  width: 85vw;

  @media only screen and (min-width: 650px) {
    width: 61vw;
    top: 300px;
    margin: 0px;
  }
`;

const Prediction = styled.div`
  font-size: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 2px 10px;
  text-align: left;

  &:not(:last-child) {
    border-bottom: 1px solid white;
  }

  &:hover {
    color: #ffa0d7;
  }

  @media only screen and (min-width: 650px) {
    font-size: 30px;
    padding: 5px;
  }
`;

export type Prediction = {
  description: string;
  matched_substrings: [];
  place_id: string;
  reference: string;
  structured_formatting: string;
  terms: [];
  types: string[];
};

type PredictionsProps = {
  setUserData: (key: string, data: string | number) => void;
  predictions?: Prediction[];
  setPredictions: (predictions?: Prediction[]) => void;
  located: boolean;
  setLocated: (located: boolean) => void;
};

export const Predictions: React.FC<PredictionsProps> = ({
  predictions,
  setUserData,
  setPredictions,
  setLocated,
  located,
}) => {
  if (!predictions || located) return null;
  return (
    <PredictionList>
      {predictions.map((prediction: Prediction) => (
        <Prediction
          key={predictions.indexOf(prediction)}
          onClick={() => {
            setUserData("locationInput", prediction.description);
            setUserData("placeID", prediction.place_id);
            setPredictions(undefined);
            setLocated(true);
          }}
        >
          {prediction.description}
        </Prediction>
      ))}
    </PredictionList>
  );
};
