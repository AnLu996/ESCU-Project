@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    alias = data["alias"]
    password = data["password"]

    use_case = RegisterUserUseCase(UserRepositoryImpl())
    result = use_case.execute(alias, password)

    return jsonify(result), 201
