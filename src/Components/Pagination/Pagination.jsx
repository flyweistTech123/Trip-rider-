import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = ({ page, totalPages, handlePageChange }) => {
    const getPaginationItems = () => {
        let items = [];
        const maxPagesToShow = 5;
        const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

        // Helper function to add page item
        const addPageItem = (pageNumber) => {
            items.push(
                <Pagination.Item key={pageNumber} active={pageNumber === page} onClick={() => handlePageChange(pageNumber)}>
                    {pageNumber}
                </Pagination.Item>
            );
        };

        // Add "First" button
        items.push(
            <Pagination.First key="first" onClick={() => handlePageChange(1)} disabled={page === 1} />
        );

        // Add "Prev" button
        items.push(
            <Pagination.Prev key="prev" onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
        );

        // Add pages with logic for showing ellipsis
        if (totalPages <= maxPagesToShow) {
            for (let number = 1; number <= totalPages; number++) {
                addPageItem(number);
            }
        } else {
            if (page <= halfMaxPagesToShow) {
                for (let number = 1; number <= maxPagesToShow - 1; number++) {
                    addPageItem(number);
                }
                items.push(<Pagination.Ellipsis key="ellipsis-end" />);
                addPageItem(totalPages);
            } else if (page > totalPages - halfMaxPagesToShow) {
                addPageItem(1);
                items.push(<Pagination.Ellipsis key="ellipsis-start" />);
                for (let number = totalPages - (maxPagesToShow - 2); number <= totalPages; number++) {
                    addPageItem(number);
                }
            } else {
                addPageItem(1);
                items.push(<Pagination.Ellipsis key="ellipsis-start" />);
                for (let number = page - halfMaxPagesToShow + 1; number <= page + halfMaxPagesToShow - 1; number++) {
                    addPageItem(number);
                }
                items.push(<Pagination.Ellipsis key="ellipsis-end" />);
                addPageItem(totalPages);
            }
        }

        // Add "Next" button
        items.push(
            <Pagination.Next key="next" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} />
        );

        // Add "Last" button
        items.push(
            <Pagination.Last key="last" onClick={() => handlePageChange(totalPages)} disabled={page === totalPages} />
        );

        return items;
    };

    return <Pagination>{getPaginationItems()}</Pagination>;
};

export default CustomPagination;
