
function handleBookDelete(id) {
	$.post('/', {
			action: 'delete',
			id: id
		},
		function(response, status) {
			$('#bookList').html(response)
		})
}
$(document).ready(function(){
	$('#formBookCreate').on('submit', function(e) {
		e.preventDefault()
		const target = e.target
		let genreArr = []
		$('input[name=genre]:checked').each(function(){
        genreArr.push($(this).val());
    });
		const data = {
			title: target.title.value,
			author: target.author.value,
			summary: target.summary.value,
			isbn: target.summary.isbn,
			genre: genreArr
		}
		$.ajax({
			url: '/',
			type: 'POST',
			data: data,
			success: function(response){
				$('#bookList').html(response)
			}
		})
	})
})
