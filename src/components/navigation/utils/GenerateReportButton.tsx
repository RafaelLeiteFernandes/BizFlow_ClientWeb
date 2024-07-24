import React from 'react';
import { FaPrint } from 'react-icons/fa';
import { generateSolicitationReport } from '../../../utils/solicitationReportService';


interface GenerateReportButtonProps {
  solicitationId: number;
}

const GenerateReportButton: React.FC<GenerateReportButtonProps> = ({ solicitationId }) => {
  return (
    <button
      onClick={() => generateSolicitationReport(solicitationId)}
      className="text-cyan-800 hover:text-cyan-900 p-2 ml-2"
      title='Imprimir'
    >
      <FaPrint />
    </button>
  );
};

export default GenerateReportButton;