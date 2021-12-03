import React from 'react';

export type GradeButtonType = {
  gradeName: string;
  callBack: (grade: number) => void;
  gradeNumber: number;
};

export function GradeButton(props: GradeButtonType): React.ReactElement {
  const { gradeName, gradeNumber, callBack } = props;
  return (
    <button
      onClick={() => callBack(gradeNumber)}
      type="button"
      className="btn btn-warning"
    >
      {gradeName}
    </button>
  );
}
