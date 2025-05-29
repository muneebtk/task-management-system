from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializer import UserRegistrationSerializer, UserDetailSerializer
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny


class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        """user registration view, handles user registration"""
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():

            user = serializer.save()
            return Response(
                {
                    "user": UserDetailSerializer(user).data,
                },
                status=status.HTTP_201_CREATED,
            )
        else:
            # Handle validation errors
            error_messages = [
                f"{field}: {error}"
                for field, errors in serializer.errors.items()
                for error in (errors if isinstance(errors, list) else [errors])
            ]
        return Response({"errors": error_messages}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def signin_user(request):
    """user sign-in view, handles user authentication and token generation.
    It checks if the user exists and if the password is correct."""
    if request.method == "POST":
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                return Response(
                    {
                        "user": UserDetailSerializer(user).data,
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST
                )
        except User.DoesNotExist:
            return Response(
                {"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
