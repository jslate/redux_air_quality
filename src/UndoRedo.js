import React from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UndoRedo = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}) => (
  <div id="undo-redo">
    <button onClick={onUndo} disabled={!canUndo}>
      Undo
    </button>
    <button onClick={onRedo} disabled={!canRedo}>
      Redo
    </button>
  </div>
);

UndoRedo.propTypes = {
  canUndo: PropTypes.bool.isRequired,
  canRedo: PropTypes.bool.isRequired,
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  canUndo: state.blocks.past.length > 0,
  canRedo: state.blocks.future.length > 0,
});

const mapDispatchToProps = dispatch => ({
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo()),
});

const ConnectedUndoRedo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UndoRedo);

export default ConnectedUndoRedo;
