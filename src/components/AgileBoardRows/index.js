import PropTypes from 'prop-types';
import Swimlane from '../Swimlane';
import AgileCard from '../AgileCard';

function AgileBoardRows({cards, columnField, columnStates, swimlaneSettings}) {
    let content;
    if (swimlaneSettings?.enabled) {
        const categorizedCards = [{ presentation: 'Uncategorized Cards' }, ...swimlaneSettings.values].map(swimlane => {
            const underSwimlaneCards = cards.filter(c => c.customFields.find(field => field.name === swimlaneSettings.field.name)?.value?.name === swimlane.name)
            return (
              <tbody key={'categorized-row-' + swimlane.name}>
                <Swimlane title={swimlane.presentation} cardsNumber={underSwimlaneCards.length} ></Swimlane>
                <tr>
                  {
                    columnStates.map(state =>
                      <td key={'cell-' + state}>
                        {
                            underSwimlaneCards.filter(c => c.customFields.find(field => field.name === columnField.name)?.value.name === state)
                              .map((c) => <AgileCard issueData={c} key={'agile-card-' + c.idReadable}/> )
                        }
                      </td>
                    )
                  }
                </tr>
              </tbody>
            );
        });
        content = categorizedCards;
    } else {
        content = (
          <tbody>
            <tr>
              {
                columnStates.map(state =>
                  <td key={'cell-' + state}>
                    {
                      cards.filter(c => c.customFields.find(field => field.name === columnField.name)?.value.name === state)
                        .map((c) => <AgileCard issueData={c} key={'agile-card-' + c.idReadable}/> )
                    }
                  </td>
                )
              }
            </tr>
          </tbody>
        );
    }
    return content;
}

AgileBoardRows.propTypes = {
    issues: PropTypes.arrayOf(PropTypes.object),
    columnField: PropTypes.object,
    columnStates: PropTypes.arrayOf(PropTypes.string),
    swimlaneSettings: PropTypes.object
}

export default AgileBoardRows
