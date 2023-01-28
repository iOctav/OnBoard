import PropTypes from 'prop-types';

function HeaderCell({caption, cardsCount}) {
  return (
    <td>
      <div className="agile-table-column-caption">{caption}</div>
      <div className="agile-table-column-icon"></div>
      <div className="agile-table-column-counter">{cardsCount}</div>
    </td>
  );
}

HeaderCell.propTypes = {
  caption: PropTypes.string,
  cardsCount: PropTypes.number
}

export default HeaderCell
