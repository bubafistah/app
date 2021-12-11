
export class PaginatorOptionsInterface {
	// The number of elements in the page
	size: number;
	// The total number of elements
	totalElements: number;
	// The total number of pages
	totalPages: number;
	// The current page number
	pageNumber: number;
}

export class PaginatorOptions implements PaginatorOptionsInterface{
	size = 15;
	totalElements = 30;
	totalPages = 1;
	pageNumber = 1;
}
