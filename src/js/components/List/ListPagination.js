import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageButton, PrevButton, NextButton } from '../Pagination';

const propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number,
  onPageChange: PropTypes.func,
};

const defaultProps = {
  pages: 1,
  onPageChange: () => {},
};

export default class ListPagination extends Component {
  constructor(props) {
    super(props);
    this.getSafePage = this.getSafePage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.applyPage = this.applyPage.bind(this);
    this.state = {
      page: props.page,
    };
  }

  componentWillReceiveProps({ page }) {
    this.setState({ page });
  }

  getSafePage(page) {
    let safePage = page;
    if (Number.isNaN(safePage)) {
      safePage = this.props.page;
    }
    return Math.min(Math.max(safePage, 0), this.props.pages - 1);
  }

  changePage(page) {
    const safePage = this.getSafePage(page);
    this.setState({ page: safePage });
    if (this.props.page !== page) {
      this.props.onPageChange(page);
    }
  }

  applyPage(e) {
    if (e) {
      e.preventDefault();
    }
    const { page } = this.state;
    this.changePage(page === '' ? this.props.page : page);
  }

  render() {
    const {
      // Computed
      pages,
      // Props
      page,
      showPageSizeOptions,
      pageSizeOptions,
      pageSize,
      showPageJump,
      canPrevious,
      canNext,
      onPageSizeChange,
      className,
      PreviousComponent = PrevButton,
      NextComponent = NextButton,
    } = this.props;

    return (
      <div className="-pagination" style={this.props.style}>
        <div className="-center">
          <PreviousComponent
            onClick={() => {
              if (!canPrevious) return
              this.changePage(page - 1)
            }}
            disabled={!canPrevious}
          >
            {this.props.previousText}
          </PreviousComponent>
          <span className="-pageInfo">
            {
              Array.from({ length: pages }).map((_, idx) => <PageButton isSelected={idx === page} label={`${idx + 1}`} onClick={() => {
                this.changePage(idx);
                this.applyPage();
              }} />)
            }
          </span>
          <NextComponent
            onClick={() => {
              if (!canNext) return
              this.changePage(page + 1)
            }}
            disabled={!canNext}
          >
            {this.props.nextText}
          </NextComponent>
        </div>
      </div>
    )
  }
}

ListPagination.propTypes = propTypes;
ListPagination.defaultProps = defaultProps;
