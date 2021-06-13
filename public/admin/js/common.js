function serializeToJson(form) {
    var result = {}
    var f = form.serializeArray()
    f.forEach(element => {
        result[element.name] = element.value
    });
    return result
}