from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView

from diht_feedback_collector.apps import setup_cors_response_headers, ResponseErrorType
from registration_service.apps import get_registration_response_error
from registration_service.models import People
from user_service.apps import get_user_response_success, get_user_response_reject
from  authorization_service.views import sessions_storage

class UserView(APIView):
    def post(self, request):
        try:
            # Database-side validations:
            try:
                session_guid = request.COOKIES["session"]
            except KeyError:
                session_guid = None

            if session_guid is None:
                return get_user_response_reject(session_guid)

            sessions_storage
            session = sessions_storage.get_session(session_guid)

            if session is None:
                return get_user_response_reject(session_guid)

            sessions_storage.update_session(session_guid)
            user = People.objects.filter(guid=session.user_guid)
            if user:
                user = user[0]
                return get_user_response_success(
                    user.login,
                    user.role,
                    session_guid)
            else:
                # to do поговорить про пользольсзователя который удален из бызы но есть в сесиях
                get_registration_response_error(ResponseErrorType.Validation, 400)

        except Exception:
            return get_registration_response_error(ResponseErrorType.Internal, 500)

    def options(self, request, *args, **kwargs):
        return setup_cors_response_headers(Response())
